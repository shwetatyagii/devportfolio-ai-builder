// ─── Initial shapes ───────────────────────────────────────────────────────────
const initialProfile = {
  basicInfo: {},
  about: {},
  skills: [],
  projects: [],
  experience: [],
  education: {},
  achievements: [],
};

export const initialPortfolioState = {
  profile: { ...initialProfile },
  drafts: [],
  activeDraftId: null,
  generatedContent: null,
  generationSource: null, // 'ai' | 'fallback' | 'error-fallback' | null
  isGenerating: false,
  selectedTemplate: "minimal",
  error: null,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
export const portfolioReducer = (state = initialPortfolioState, action) => {
  switch (action.type) {
    // ── Profile steps ────────────────────────────────────────────────────────
    case "UPDATE_STEP_DATA":
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.payload.step]: action.payload.data,
        },
      };

    case "SET_PROFILE":
      return { ...state, profile: action.payload };

    case "RESET_PROFILE":
      return {
        ...state,
        profile: { ...initialProfile },
        activeDraftId: null,
        generatedContent: null,
        generationSource: null,
        error: null,
      };

    // ── Drafts ───────────────────────────────────────────────────────────────
    case "SAVE_DRAFT": {
      const { id, name, profile } = action.payload;

      // Check if this is an update to an existing draft
      const existingIndex = id
        ? state.drafts.findIndex((d) => d.id === id)
        : -1;
      const isUpdate = existingIndex >= 0;

      const draft = {
        id: isUpdate ? id : crypto.randomUUID(),
        name: (name ?? "Untitled Draft").trim() || "Untitled Draft",
        profile: profile ?? state.profile,
        updatedAt: new Date().toISOString(),
        createdAt: isUpdate
          ? state.drafts[existingIndex].createdAt
          : new Date().toISOString(),
      };

      const drafts = isUpdate
        ? state.drafts.map((d) => (d.id === draft.id ? draft : d))
        : [...state.drafts, draft];

      return { ...state, drafts, activeDraftId: draft.id };
    }

    case "LOAD_DRAFT": {
      const draft = state.drafts.find((d) => d.id === action.payload);
      if (!draft) return state;
      return {
        ...state,
        profile: { ...initialProfile, ...draft.profile },
        activeDraftId: draft.id,
        generatedContent: draft.generatedContent ?? null, // ← restore AI output
        generationSource: draft.generationSource ?? null, // ← restore source
        error: null,
      };
    }

    case "DELETE_DRAFT": {
      const drafts = state.drafts.filter((d) => d.id !== action.payload);
      const activeDraftId =
        state.activeDraftId === action.payload ? null : state.activeDraftId;
      return { ...state, drafts, activeDraftId };
    }

    case "UPDATE_DRAFT_GENERATED": {
      const { id, generatedContent, generationSource } = action.payload;
      if (!id) return state;
      const drafts = state.drafts.map((d) =>
        d.id === id
          ? {
              ...d,
              generatedContent,
              generationSource,
              updatedAt: new Date().toISOString(),
            }
          : d,
      );
      return { ...state, drafts };
    }

    // ── AI generation ────────────────────────────────────────────────────────
    case "SET_GENERATED_CONTENT":
      return {
        ...state,
        generatedContent: action.payload.content,
        generationSource: action.payload.source ?? null,
        isGenerating: false,
        error: null,
      };

    case "UPDATE_GENERATED_SECTION":
      return {
        ...state,
        generatedContent: state.generatedContent
          ? { ...state.generatedContent, ...action.payload }
          : action.payload,
      };

    case "SET_GENERATING":
      return { ...state, isGenerating: action.payload };

    case "CLEAR_GENERATED":
      return { ...state, generatedContent: null, generationSource: null };

    // ── Templates ────────────────────────────────────────────────────────────
    case "SET_TEMPLATE":
      return { ...state, selectedTemplate: action.payload };

    // ── Errors ───────────────────────────────────────────────────────────────
    case "SET_ERROR":
      return { ...state, error: action.payload, isGenerating: false };

    default:
      return state;
  }
};
