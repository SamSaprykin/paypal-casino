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
  WarningArticle,
} from "./components/Pages/Content/ContentArticleComponents.jsx";
import { LastUpdated } from "./components/Pages/LastUpdated.jsx";

export function useMDXComponents() {
  return {
    ArticleShell,
    InfoArticle,
    TipArticle,
    WarningArticle,
    LastUpdated,
    CriteriaGrid,
    CriteriaItem,
    EditorNote,
    ProsConsArticle,
    HowToArticle,
    StepCard,
    wrapper: ArticleShell,
  };
}
