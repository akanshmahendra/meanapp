export interface Post {
    id: string;
    title: string;
    content: string;
}

export interface PostDto {
    message: string;
    posts: any;
}