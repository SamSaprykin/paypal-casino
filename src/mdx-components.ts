import {
  ArticleShell,
  CriteriaGrid,
  CriteriaItem,
  EditorNote,
  HowToArticle,
  InfoArticle,
  ProsConsArticle,
  StepCard,
  TipArticle,
} from "./components/Pages/Content/ContentArticleComponents.jsx";

export function useMDXComponents() {
  return {
    ArticleShell,
    InfoArticle,
    TipArticle,
    CriteriaGrid,
    CriteriaItem,
    EditorNote,
    ProsConsArticle,
    HowToArticle,
    StepCard,
    wrapper: ArticleShell,
  };
}
