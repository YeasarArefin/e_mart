import { ApiResponse } from "@/types/ApiResponse";

export default async function getQuery(url: string): Promise<ApiResponse> {
    const response = await fetch(url, { cache: 'no-cache' });
    return response.json();
}