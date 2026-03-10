export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: string[];        
  mediaUrl?: string;      
  mediaType?: string;
}