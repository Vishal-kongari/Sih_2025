// src/services/youtube.ts

export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    channelTitle: string;
    publishedAt: string;
    viewCount: string;
    duration: string;
    url: string;
}

export const VIDEO_CATEGORIES = {
    meditation: {
        name: 'Meditation',
        icon: '🧘',
        query: 'guided meditation mindfulness relaxation'
    },
    yoga: {
        name: 'Yoga',
        icon: '🧘‍♀️',
        query: 'yoga for beginners morning yoga stretch'
    },
    motivation: {
        name: 'Motivation',
        icon: '💪',
        query: 'motivational speech inspiration success mindset'
    },
    spiritual: {
        name: 'Spiritual',
        icon: '✨',
        query: 'spiritual growth enlightenment consciousness'
    },
    stress: {
        name: 'Stress Relief',
        icon: '😌',
        query: 'stress relief anxiety calm breathing exercises'
    },
    sleep: {
        name: 'Sleep',
        icon: '😴',
        query: 'sleep meditation deep relaxation insomnia'
    }
} as const;

// Mock data for fallback
const MOCK_VIDEOS: YouTubeVideo[] = [
    {
        id: '1',
        title: '10 Minute Meditation For Anxiety',
        description: 'A short guided meditation to help relieve anxiety and stress',
        thumbnail: 'https://img.youtube.com/vi/inpok4MKVLM/mqdefault.jpg',
        channelTitle: 'Mindful Movement',
        publishedAt: '2023-01-15',
        viewCount: '1.2M views',
        duration: '10:00',
        url: 'https://www.youtube.com/watch?v=inpok4MKVLM'
    },
    {
        id: '2',
        title: 'Morning Yoga Full Body Stretch',
        description: 'Wake up your body with this gentle morning yoga routine',
        thumbnail: 'https://img.youtube.com/vi/VaoV1PrYft4/mqdefault.jpg',
        channelTitle: 'Yoga With Adriene',
        publishedAt: '2023-02-20',
        viewCount: '2.5M views',
        duration: '15:30',
        url: 'https://www.youtube.com/watch?v=VaoV1PrYft4'
    },
    {
        id: '3',
        title: 'Garikapati Narasimha Rao - Bhagavad Gita Discourse',
        description: 'Spiritual discourse on Bhagavad Gita by Garikapati Narasimha Rao',
        thumbnail: 'https://img.youtube.com/vi/abc123/mqdefault.jpg',
        channelTitle: 'Spiritual Talks',
        publishedAt: '2023-03-10',
        viewCount: '500K views',
        duration: '45:00',
        url: 'https://www.youtube.com/watch?v=abc123'
    },
    {
        id: '4',
        title: '5 Minute Motivation - Start Your Day Right',
        description: 'Quick motivational video to boost your day',
        thumbnail: 'https://img.youtube.com/vi/def456/mqdefault.jpg',
        channelTitle: 'Daily Motivation',
        publishedAt: '2023-04-05',
        viewCount: '800K views',
        duration: '5:15',
        url: 'https://www.youtube.com/watch?v=def456'
    },
    {
        id: '5',
        title: 'Deep Sleep Meditation',
        description: 'Guided meditation for deep sleep and relaxation',
        thumbnail: 'https://img.youtube.com/vi/ghi789/mqdefault.jpg',
        channelTitle: 'Sleep Meditation',
        publishedAt: '2023-05-12',
        viewCount: '1.5M views',
        duration: '30:00',
        url: 'https://www.youtube.com/watch?v=ghi789'
    },
    {
        id: '6',
        title: 'Stress Relief Breathing Exercises',
        description: 'Simple breathing techniques to relieve stress instantly',
        thumbnail: 'https://img.youtube.com/vi/jkl012/mqdefault.jpg',
        channelTitle: 'Mental Wellness',
        publishedAt: '2023-06-18',
        viewCount: '900K views',
        duration: '8:20',
        url: 'https://www.youtube.com/watch?v=jkl012'
    },
    {
        id: '7',
        title: 'Bhagavad Gita Chapter 2 - Sankhya Yoga',
        description: 'Detailed explanation of Chapter 2 by spiritual master',
        thumbnail: 'https://img.youtube.com/vi/mno345/mqdefault.jpg',
        channelTitle: 'Spiritual Wisdom',
        publishedAt: '2023-07-22',
        viewCount: '300K views',
        duration: '60:00',
        url: 'https://www.youtube.com/watch?v=mno345'
    },
    {
        id: '8',
        title: 'Yoga for Stress and Anxiety',
        description: 'Yoga poses specifically designed to reduce stress',
        thumbnail: 'https://img.youtube.com/vi/pqr678/mqdefault.jpg',
        channelTitle: 'Yoga Therapy',
        publishedAt: '2023-08-30',
        viewCount: '1.1M views',
        duration: '25:00',
        url: 'https://www.youtube.com/watch?v=pqr678'
    }
];

// Simulate API delay for consistent UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Check if YouTube API key is available
const isYouTubeApiAvailable = () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    return Boolean(apiKey && apiKey !== 'your_youtube_api_key_here');
};

// YouTube API configuration
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos';

// Fetch videos from YouTube API
const fetchYouTubeVideos = async (params: Record<string, string>) => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    if (!apiKey) {
        throw new Error('YouTube API key not configured');
    }

    const queryParams = new URLSearchParams({
        key: apiKey,
        part: 'snippet',
        type: 'video',
        maxResults: '50',
        videoEmbeddable: 'true',
        ...params
    });

    try {
        const response = await fetch(`${YOUTUBE_API_URL}?${queryParams}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`YouTube API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('YouTube API error:', error);
        throw error;
    }
};

// Get detailed video information
const getVideoDetails = async (videoIds: string[]) => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    if (videoIds.length === 0) return [];

    const queryParams = new URLSearchParams({
        key: apiKey,
        part: 'snippet,contentDetails,statistics',
        id: videoIds.join(',')
    });

    try {
        const response = await fetch(`${YOUTUBE_VIDEO_URL}?${queryParams}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`YouTube API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('YouTube API details error:', error);
        throw error;
    }
};

// Format ISO 8601 duration to readable format
const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');

    if (hours) {
        return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
};

// Format view count to readable format
const formatViewCount = (count: string) => {
    const num = parseInt(count);
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M views`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K views`;
    }
    return `${num} views`;
};

// Format date to readable format
const formatPublishedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Transform YouTube API data to our format
const transformVideoData = (video: any): YouTubeVideo => ({
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default.url,
    channelTitle: video.snippet.channelTitle,
    publishedAt: formatPublishedDate(video.snippet.publishedAt),
    viewCount: formatViewCount(video.statistics?.viewCount || '0'),
    duration: formatDuration(video.contentDetails?.duration || 'PT0M0S'),
    url: `https://www.youtube.com/watch?v=${video.id}`
});

// Search videos by query
export const searchVideosByQuery = async (query: string, maxResults: number = 10): Promise<YouTubeVideo[]> => {
    await delay(300); // Simulate API call for consistent UX

    if (!isYouTubeApiAvailable()) {
        console.warn('YouTube API not available, using mock data');
        // Filter mock videos based on query
        const filteredVideos = MOCK_VIDEOS.filter(video =>
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.description.toLowerCase().includes(query.toLowerCase()) ||
            video.channelTitle.toLowerCase().includes(query.toLowerCase())
        );
        return filteredVideos.slice(0, maxResults);
    }

    try {
        console.log('Searching YouTube for:', query);

        // Search for videos
        const searchResults = await fetchYouTubeVideos({
            q: query,
            maxResults: maxResults.toString(),
            order: 'relevance'
        });

        // Get video IDs from search results
        const videoIds = searchResults.map((video: any) => video.id.videoId).filter(Boolean);

        if (videoIds.length === 0) {
            return [];
        }

        // Get detailed video information
        const videoDetails = await getVideoDetails(videoIds);

        // Transform data to our format
        return videoDetails.map(transformVideoData);

    } catch (error) {
        console.error('Error searching YouTube videos:', error);

        // Fallback to mock data
        const filteredVideos = MOCK_VIDEOS.filter(video =>
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.description.toLowerCase().includes(query.toLowerCase())
        );

        return filteredVideos.slice(0, maxResults);
    }
};

// Search videos by category
export const searchVideosByCategory = async (category: keyof typeof VIDEO_CATEGORIES, maxResults: number = 10): Promise<YouTubeVideo[]> => {
    await delay(300);

    const categoryQuery = VIDEO_CATEGORIES[category].query;

    if (!isYouTubeApiAvailable()) {
        console.warn('YouTube API not available, using mock data for category:', category);

        // Filter mock videos based on category query
        const filteredVideos = MOCK_VIDEOS.filter(video =>
            video.title.toLowerCase().includes(categoryQuery.split(' ')[0].toLowerCase()) ||
            video.description.toLowerCase().includes(categoryQuery.split(' ')[0].toLowerCase())
        );

        // If not enough results, return some relevant videos
        if (filteredVideos.length < maxResults) {
            const additionalVideos = MOCK_VIDEOS.filter(video =>
                !filteredVideos.includes(video)
            ).slice(0, maxResults - filteredVideos.length);

            return [...filteredVideos, ...additionalVideos].slice(0, maxResults);
        }

        return filteredVideos.slice(0, maxResults);
    }

    try {
        console.log('Searching YouTube category:', category, 'with query:', categoryQuery);

        const searchResults = await fetchYouTubeVideos({
            q: categoryQuery,
            maxResults: maxResults.toString(),
            order: 'relevance'
        });

        const videoIds = searchResults.map((video: any) => video.id.videoId).filter(Boolean);

        if (videoIds.length === 0) {
            return [];
        }

        const videoDetails = await getVideoDetails(videoIds);
        return videoDetails.map(transformVideoData);

    } catch (error) {
        console.error('Error searching YouTube category:', error);

        // Fallback to mock data
        const filteredVideos = MOCK_VIDEOS.filter(video =>
            video.title.toLowerCase().includes(categoryQuery.split(' ')[0].toLowerCase()) ||
            video.description.toLowerCase().includes(categoryQuery.split(' ')[0].toLowerCase())
        );

        return filteredVideos.slice(0, maxResults);
    }
};

// Get recommended videos
export const getRecommendedVideos = async (speaker: string = '', maxResults: number = 8): Promise<YouTubeVideo[]> => {
    await delay(300);

    if (!isYouTubeApiAvailable()) {
        console.warn('YouTube API not available, using mock data for recommendations');

        // If speaker is specified, try to find videos by that speaker
        if (speaker) {
            const speakerVideos = MOCK_VIDEOS.filter(video =>
                video.channelTitle.toLowerCase().includes(speaker.toLowerCase()) ||
                video.title.toLowerCase().includes(speaker.toLowerCase())
            );

            if (speakerVideos.length > 0) {
                return speakerVideos.slice(0, maxResults);
            }
        }

        // Return a mix of different types of videos
        return MOCK_VIDEOS.slice(0, maxResults);
    }

    try {
        let query = 'wellness meditation yoga motivation spiritual';

        if (speaker) {
            query = speaker;
        }

        const searchResults = await fetchYouTubeVideos({
            q: query,
            maxResults: maxResults.toString(),
            order: 'viewCount'
        });

        const videoIds = searchResults.map((video: any) => video.id.videoId).filter(Boolean);

        if (videoIds.length === 0) {
            return [];
        }

        const videoDetails = await getVideoDetails(videoIds);
        return videoDetails.map(transformVideoData);

    } catch (error) {
        console.error('Error getting recommended videos:', error);

        // Fallback to mock data
        if (speaker) {
            const speakerVideos = MOCK_VIDEOS.filter(video =>
                video.channelTitle.toLowerCase().includes(speaker.toLowerCase()) ||
                video.title.toLowerCase().includes(speaker.toLowerCase())
            );

            if (speakerVideos.length > 0) {
                return speakerVideos.slice(0, maxResults);
            }
        }

        return MOCK_VIDEOS.slice(0, maxResults);
    }
};

// Get trending wellness videos
export const getTrendingWellnessVideos = async (maxResults: number = 8): Promise<YouTubeVideo[]> => {
    await delay(300);

    if (!isYouTubeApiAvailable()) {
        console.warn('YouTube API not available, using mock data for trending videos');

        // Return videos with highest view counts (simulating trending)
        return [...MOCK_VIDEOS]
            .sort((a, b) => {
                const aViews = parseFloat(a.viewCount);
                const bViews = parseFloat(b.viewCount);
                return bViews - aViews;
            })
            .slice(0, maxResults);
    }

    try {
        const searchResults = await fetchYouTubeVideos({
            q: 'wellness meditation yoga mental health',
            maxResults: maxResults.toString(),
            order: 'viewCount'
        });

        const videoIds = searchResults.map((video: any) => video.id.videoId).filter(Boolean);

        if (videoIds.length === 0) {
            return [];
        }

        const videoDetails = await getVideoDetails(videoIds);
        return videoDetails.map(transformVideoData);

    } catch (error) {
        console.error('Error getting trending videos:', error);

        // Fallback to mock data
        return [...MOCK_VIDEOS]
            .sort((a, b) => {
                const aViews = parseFloat(a.viewCount);
                const bViews = parseFloat(b.viewCount);
                return bViews - aViews;
            })
            .slice(0, maxResults);
    }
};

// Get video by ID
export const getVideoById = async (videoId: string): Promise<YouTubeVideo | null> => {
    if (!isYouTubeApiAvailable()) {
        console.warn('YouTube API not available, using mock data');
        return MOCK_VIDEOS.find(video => video.id === videoId) || null;
    }

    try {
        const videoDetails = await getVideoDetails([videoId]);

        if (videoDetails.length === 0) {
            return null;
        }

        return transformVideoData(videoDetails[0]);

    } catch (error) {
        console.error('Error getting video by ID:', error);

        // Fallback to mock data
        return MOCK_VIDEOS.find(video => video.id === videoId) || null;
    }
};