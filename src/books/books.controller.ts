import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBooksDto } from './dto/query-books.dto';

@Controller('api/v1/books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    async getBooks(@Query() query: QueryBooksDto) {
      return await this.booksService.getBooks(query);
    }
  
    @Post()
    async createBook(@Body() createBookDto: CreateBookDto) {
      return await this.booksService.createBook(createBookDto);
    }
  
}
