import { HttpStatus, Injectable } from '@nestjs/common';
import { ManagerError } from 'src/common/errors/manager.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ApiAllResponse, ApiOneResponse } from 'src/common/interfaces/api-response.interface';
import { OrderDetailEntity } from './entities/order-detail.entity'; 
import { CreateOrderDetailDto } from './dto/create-order-detail.dto'; 
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';

@Injectable()
export class OrderDetailService {

  constructor(
    @InjectRepository(OrderDetailService)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
  ) { }

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<ApiOneResponse<OrderDetailEntity>> {
    try {
      const orderDetail = await this.orderDetailRepository.save(createOrderDetailDto);
      if (!orderDetail) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'orderDetail not created!',
        });
      }
      return {
        status: {
          statusMsg: "CREATED",
          statusCode: HttpStatus.CREATED,
          error: null,
        },
        data: orderDetail,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<OrderDetailEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.orderDetailRepository.count({ where: { isActive: true } }),
        this.orderDetailRepository.createQueryBuilder('order')
          .where({ isActive: true })
          .leftJoinAndSelect('orderDetail.category', 'category')
          .leftJoinAndSelect('orderDetail.order', 'order')
          .take(limit)
          .skip(skip)
          .getMany()
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        meta: {
          page,
          limit,
          lastPage,
          total,
        },
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<ApiOneResponse<OrderDetailEntity>> {
    try {
      const orderDetail = await this.orderDetailRepository.createQueryBuilder('order')
        .where({ id, isActive: true })
        .leftJoinAndSelect('product.supplier', 'supplier')
        .leftJoinAndSelect('product.category', 'category')
        .getOne()

      if (!orderDetail) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'orderDetail not found!',
        })
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: orderDetail,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<ApiOneResponse<UpdateResult>> {
    try {
      const orderDetail = await this.orderDetailRepository.update({ id, isActive: true }, { isActive: false });
      if (orderDetail.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'orderDetail not found',
        });
      }

      return {
        status: {
          statusMsg: "OK",
          statusCode: HttpStatus.OK,
          error: null,
        },
        data: orderDetail,
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
