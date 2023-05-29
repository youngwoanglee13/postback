import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserPostReviewService } from './userpostreview.service';
import { ReviewEntity } from 'src/entities/review.entity';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
@Controller('review')
export class ReviewController {
    constructor(private userPostReviewService: UserPostReviewService) { }
    @Post()
    @UseGuards(JwtAuthGuard)
    createReview( @Body() payload: { review: ReviewEntity, idPost: number }, @Request() request) : Promise<ReviewEntity> {
        return this.userPostReviewService.createReview(payload.review, payload.idPost, request.user.id);
    }
    @Get()
    getReviews(): Promise<ReviewEntity[]> {
        return this.userPostReviewService.getReviews();
    }
    @Get()
    getReview(id: number): Promise<ReviewEntity> {
        return this.userPostReviewService.getReview(id);
    }
    @Put()
    updateReview(id: number, review: ReviewEntity): Promise<ReviewEntity> {
        return this.userPostReviewService.updateReview(id, review);
    }
}
