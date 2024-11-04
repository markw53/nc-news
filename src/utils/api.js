import axios from 'axios';

const api = axios.create({
    baseURL: 'https://be-nc-news-nnbf.onrender.com/api',
});

export const fetchArticles = async (query = {}) => {
    const { author, topic, sort_by = 'created_at', order = 'desc', limit = 10, page = 1 } = query;
    try {
        const response = await api.get('/articles', {
            params: { author, topic, sort_by, order, limit, page }
        });
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
};
