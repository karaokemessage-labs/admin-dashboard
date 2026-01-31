import { apiClient, ApiError } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import {
    CreateChatRoomRequestDto,
    ChatRoomResponseDto,
    SendMessageRequestDto,
    ChatMessageResponseDto,
    MarkMessagesReadRequestDto,
    GetChatRoomsResponseDto,
    GetMessagesResponseDto,
    PaginationParams,
} from '../types/api';

export interface ChatService {
    // Chat Rooms
    createChatRoom: (data: CreateChatRoomRequestDto) => Promise<ChatRoomResponseDto>;
    getChatRooms: (params?: PaginationParams) => Promise<GetChatRoomsResponseDto>;
    getChatRoom: (roomId: string) => Promise<ChatRoomResponseDto>;
    addParticipant: (roomId: string, userId: string) => Promise<ChatRoomResponseDto>;
    removeParticipant: (roomId: string, userId: string) => Promise<ChatRoomResponseDto>;

    // Messages
    getMessages: (roomId: string, params?: PaginationParams) => Promise<GetMessagesResponseDto>;
    sendMessage: (roomId: string, data: SendMessageRequestDto) => Promise<ChatMessageResponseDto>;
    markMessagesRead: (roomId: string, messageIds: string[]) => Promise<void>;
    deleteMessage: (messageId: string) => Promise<void>;
}

class ChatServiceImpl implements ChatService {
    async createChatRoom(data: CreateChatRoomRequestDto): Promise<ChatRoomResponseDto> {
        try {
            const response = await apiClient.post<ChatRoomResponseDto>(
                API_ENDPOINTS.CHATS.ROOMS,
                data
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Tạo phòng chat thất bại');
        }
    }

    async getChatRooms(params: PaginationParams = { page: 1, limit: 20 }): Promise<GetChatRoomsResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('page', (params.page || 1).toString());
            queryParams.append('limit', (params.limit || 20).toString());

            const response = await apiClient.get<GetChatRoomsResponseDto>(
                `${API_ENDPOINTS.CHATS.ROOMS}?${queryParams.toString()}`
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách phòng chat thất bại');
        }
    }

    async getChatRoom(roomId: string): Promise<ChatRoomResponseDto> {
        try {
            const response = await apiClient.get<ChatRoomResponseDto>(
                API_ENDPOINTS.CHATS.ROOM_BY_ID(roomId)
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy thông tin phòng chat thất bại');
        }
    }

    async addParticipant(roomId: string, userId: string): Promise<ChatRoomResponseDto> {
        try {
            const response = await apiClient.post<ChatRoomResponseDto>(
                API_ENDPOINTS.CHATS.ROOM_PARTICIPANTS(roomId),
                { userId }
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Thêm thành viên vào phòng chat thất bại');
        }
    }

    async removeParticipant(roomId: string, userId: string): Promise<ChatRoomResponseDto> {
        try {
            const response = await apiClient.delete<ChatRoomResponseDto>(
                API_ENDPOINTS.CHATS.REMOVE_PARTICIPANT(roomId, userId)
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Xóa thành viên khỏi phòng chat thất bại');
        }
    }

    async getMessages(roomId: string, params: PaginationParams = {}): Promise<GetMessagesResponseDto> {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page.toString());
            if (params.limit) queryParams.append('limit', params.limit.toString());

            const endpoint = queryParams.toString()
                ? `${API_ENDPOINTS.CHATS.MESSAGES(roomId)}?${queryParams.toString()}`
                : API_ENDPOINTS.CHATS.MESSAGES(roomId);

            const response = await apiClient.get<GetMessagesResponseDto>(endpoint);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Lấy danh sách tin nhắn thất bại');
        }
    }

    async sendMessage(roomId: string, data: SendMessageRequestDto): Promise<ChatMessageResponseDto> {
        try {
            const response = await apiClient.post<ChatMessageResponseDto>(
                API_ENDPOINTS.CHATS.MESSAGES(roomId),
                data
            );
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Gửi tin nhắn thất bại');
        }
    }

    async markMessagesRead(roomId: string, messageIds: string[]): Promise<void> {
        try {
            await apiClient.post(
                API_ENDPOINTS.CHATS.MARK_READ(roomId),
                { messageIds } as MarkMessagesReadRequestDto
            );
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Đánh dấu đã đọc thất bại');
        }
    }

    async deleteMessage(messageId: string): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.CHATS.DELETE_MESSAGE(messageId));
        } catch (error) {
            const apiError = error as ApiError;
            throw new Error(apiError.message || 'Xóa tin nhắn thất bại');
        }
    }
}

export const chatService: ChatService = new ChatServiceImpl();
