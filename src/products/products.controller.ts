import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {CreateProductDto} from "./dtos/create-product.dto";
import {UpdateProductDto} from "./dtos/update-product.dto";
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth} from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createProduct(@Res() response, @Body() createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.productsService.createProduct(createProductDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been created successfully',
        newProduct,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getProducts(@Res() response) {
    try {
      const products = await this.productsService.getAllProducts();

      return response.status(HttpStatus.OK).json({
        message: 'All products data found successfully',
        products,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getProduct(@Res() response, @Param('id') productId: string) {
    try {
      const product = await this.productsService.getProduct(productId);

      return response.status(HttpStatus.OK).json({
        message: 'Product found successfully',
        product,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateProduct(@Res() response, @Param('id') productId: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const productUpdated = await this.productsService.updateProduct(productId, updateProductDto);

      return response.status(HttpStatus.OK).json({
        message: 'Product has been successfully updated',
        productUpdated,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteProduct(@Res() response, @Param('id') productId: string) {
    try {
      const productDeleted = await this.productsService.deleteProduct(productId);

      return response.status(HttpStatus.OK).json({
        message: 'Product deleted successfully',
        productDeleted,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
