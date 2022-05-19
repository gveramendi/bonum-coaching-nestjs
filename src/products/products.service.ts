import {BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Product} from "./interfaces/product.interface";
import {CreateProductDto} from "./dtos/create-product.dto";
import {UpdateProductDto} from "./dtos/update-product.dto";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(@InjectModel('Product') private productModel:Model<Product>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const foundProduct = await this.productModel.findOne({ "code": createProductDto.code }).exec();
    if (foundProduct) {
      throw new BadRequestException(`Product with code: ${createProductDto.code} already exits.`)
    }

    const newProduct = await new this.productModel(createProductDto);
    this.logger.log(`Product with id: ${newProduct.id} was create.`);

    return newProduct.save();
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find();

    return products;
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    return product;
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const foundProduct = await this.productModel.findOne({ "code": updateProductDto.code }).exec();
    if (foundProduct && foundProduct.id !== productId) {
      throw new BadRequestException(`Product with code: ${updateProductDto.code} already exits.`)
    }

    const existingProduct = await this.productModel.findByIdAndUpdate(productId, updateProductDto, { new: true });
    if (!existingProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    this.logger.log(`Product with id: ${existingProduct.id} was update.`);
    return existingProduct;
  }

  async deleteProduct(productId: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }

    this.logger.log(`Product with id: ${deletedProduct.id} was delete.`);
    return deletedProduct;
  }
}
