import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createSupabaseClient } from 'src/common/supabase.client';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBooksDto } from './dto/query-books.dto';

@Injectable()
export class BooksService {
    
    private supabase = createSupabaseClient(this.configService);
    constructor(private configService: ConfigService) { }

    async getBooks(query: QueryBooksDto) {
        const { author_id, page = 1, limit = 10, year } = query;
        let queryBuilder = this.supabase
            .from('Books')
            .select('*, Authors(name)')
            .eq('author_id', author_id)
            .range((page - 1) * limit, page * limit - 1);

        if (year) {
            queryBuilder = queryBuilder.eq('publish_date', `${year}-01-01`);
        }

        const { data, error } = await queryBuilder;
        if (error) throw new Error(error.message);
        return data;
    }


    async createBook(createBookDto: CreateBookDto) {
        const { data, error } = await this.supabase
            .from('Books')
            .insert([createBookDto]);
        if (error) throw new Error(error.message);
        return data;
    }

}
