export const defaultProfile = {
  basicInfo: {
    name: "",
    title: "",
    location: "",
    email: "",
    github: "",
    linkedin: "",
    website: "",
  },
  about: { summary: "", careerGoal: "", uniqueStrength: "" },
  skills: [],
  projects: [],
  experience: [],
  education: { degree: "", branch: "", college: "", year: "", cgpa: "" },
  achievements: [],
};

export const initialPortfolioState = {
  profile: { ...defaultProfile },
  drafts: [],
  activeDraftId: null,
  generatedContent: null,
  isGenerating: false,
  selectedTemplate: "minimal",
  error: null,
};

export const portfolioReducer = (state, action) => {
  switch (action.type) {
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
        profile: { ...defaultProfile },
        activeDraftId: null,
        generatedContent: null,
        error: null,
      };

    case "SAVE_DRAFT": {
      const exists =
        state.drafts.findIndex((d) => d.id === action.payload.id) >= 0;
      return {
        ...state,
        activeDraftId: action.payload.id,
        drafts: exists
          ? state.drafts.map((d) =>
              d.id === action.payload.id ? action.payload : d,
            )
          : [...state.drafts, action.payload],
      };
    }

    case "LOAD_DRAFT": {
      const draft = state.drafts.find((d) => d.id === action.payload);
      if (!draft) return state;
      return { ...state, profile: draft.profile, activeDraftId: draft.id };
    }

    case "DELETE_DRAFT":
      return {
        ...state,
        drafts: state.drafts.filter((d) => d.id !== action.payload),
        activeDraftId:
          state.activeDraftId === action.payload ? null : state.activeDraftId,
      };

    case "SET_GENERATED_CONTENT":
      return {
        ...state,
        generatedContent: action.payload,
        isGenerating: false,
        error: null,
      };

    case "SET_GENERATING":
      return { ...state, isGenerating: action.payload, error: null };

    case "CLEAR_GENERATED":
      return { ...state, generatedContent: null, error: null };

    case "SET_TEMPLATE":
      return { ...state, selectedTemplate: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, isGenerating: false };

    default:
      return state;
  }
};
