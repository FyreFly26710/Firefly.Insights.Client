// utils/articleHelpers.ts

// --- Interfaces based on your DTOs ---
export interface TagDto {
  TagId: number;
  Name: string;
  Type: string;
}

export interface ArticleDto {
  ArticleId: number;
  Title: string;
  Description: string;
  TopicId: number;
  TopicName: string;
  UserName: string;
  UserAvatar: string; // URL to image
  SortNumber: number;
  CreatedAt: string; // Assuming API sends ISO string
  Tags: TagDto[];
}

// --- Tag Handling Helpers ---

// Helper to extract a specific tag type
export const getTagByType = (tags: TagDto[], type: string): TagDto | undefined => {
  return tags.find((tag) => tag.Type === type);
};

// Helper to get color for Skill Level based on your rules
export const getSkillLevelColor = (levelName: string | undefined): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
  switch (levelName?.toLowerCase()) {
    case 'beginner': return 'success'; // Green
    case 'advanced': return 'warning'; // Orange
    case 'expert': return 'error';   // Red
    case 'general': return 'info';    // Blue/Neutral
    default: return 'default';
  }
};

// Helper for date display (e.g., "2 days ago")
export const formatDateRelative = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
      return dateString;
  }
};