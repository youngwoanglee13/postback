import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserPostReviewService } from './userpostreview.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ReviewDTO } from 'src/dto/review.dto';
@Controller('review')
export class ReviewController {
    constructor(private userPostReviewService: UserPostReviewService) { }
    @Post()
    @UseGuards(JwtAuthGuard)
    createReview( @Body() payload: { review: ReviewDTO, idPost: number }, @Request() request) : Promise<ReviewDTO> {
        return this.userPostReviewService.createReview(payload.review, payload.idPost, request.user.id);
    }
    @Get()
    getReviews(): Promise<ReviewDTO[]> {
        return this.userPostReviewService.getReviews();
    }
    @Get()
    getReview(id: number): Promise<ReviewDTO> {
        return this.userPostReviewService.getReview(id);
    }
    @Put()
    @UseGuards(JwtAuthGuard)
    updateReview(id: number, review: ReviewDTO): Promise<ReviewDTO> {
        return this.userPostReviewService.updateReview(id, review);
    }
}
