export interface FairyTaleContentResponse {
  id: number;
  title: string;
  page: number;
  imageUrl: string;
  script: string;
}

export interface FairyTaleCategoryResponse {
  id: number;
  name: string;
}

export interface FairyTaleResponse {
  id: number;
  title: string;
  author: string;
  thumbnailImage: string;
  pageCount: number;
  categoryName: string;
  isFavorite: boolean;
}

export interface FairyTale {
  id: number;
  title: string;
  author: string;
  thumbnailImage: string;
  pageCount: number;
  categoryName: string;
}

export interface ConceptResponse {
  concept_kr: string;
  concept_en: string;
}

export interface CustomFairyTaleConceptResponse {
  imageUrl: string;
  imageContentType: string;
  conceptResponse: ConceptResponse[];
}
