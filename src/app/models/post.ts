export interface Post {
    id: string;
    title: string;
    content: string;
    image?: File | string;
    imagePath: string;
}

export interface PostDto {
    message: string;
    posts: any;
}
