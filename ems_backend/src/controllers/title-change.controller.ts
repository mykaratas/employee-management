import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TitleChange} from '../models';
import {TitleChangeRepository} from '../repositories';

export class TitleChangeController {
  constructor(
    @repository(TitleChangeRepository)
    public titleChangeRepository : TitleChangeRepository,
  ) {}

  @post('/title-changes', {
    responses: {
      '200': {
        description: 'TitleChange model instance',
        content: {'application/json': {schema: getModelSchemaRef(TitleChange)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleChange, {
            title: 'NewTitleChange',
            exclude: ['id'],
          }),
        },
      },
    })
    titleChange: Omit<TitleChange, 'id'>,
  ): Promise<TitleChange> {
    return this.titleChangeRepository.create(titleChange);
  }

  @get('/title-changes/count', {
    responses: {
      '200': {
        description: 'TitleChange model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TitleChange) where?: Where<TitleChange>,
  ): Promise<Count> {
    return this.titleChangeRepository.count(where);
  }

  @get('/title-changes', {
    responses: {
      '200': {
        description: 'Array of TitleChange model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TitleChange, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TitleChange) filter?: Filter<TitleChange>,
  ): Promise<TitleChange[]> {
    return this.titleChangeRepository.find(filter);
  }

  @patch('/title-changes', {
    responses: {
      '200': {
        description: 'TitleChange PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleChange, {partial: true}),
        },
      },
    })
    titleChange: TitleChange,
    @param.where(TitleChange) where?: Where<TitleChange>,
  ): Promise<Count> {
    return this.titleChangeRepository.updateAll(titleChange, where);
  }

  @get('/title-changes/{id}', {
    responses: {
      '200': {
        description: 'TitleChange model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TitleChange, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TitleChange, {exclude: 'where'}) filter?: FilterExcludingWhere<TitleChange>
  ): Promise<TitleChange> {
    return this.titleChangeRepository.findById(id, filter);
  }

  @patch('/title-changes/{id}', {
    responses: {
      '204': {
        description: 'TitleChange PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleChange, {partial: true}),
        },
      },
    })
    titleChange: TitleChange,
  ): Promise<void> {
    await this.titleChangeRepository.updateById(id, titleChange);
  }

  @put('/title-changes/{id}', {
    responses: {
      '204': {
        description: 'TitleChange PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() titleChange: TitleChange,
  ): Promise<void> {
    await this.titleChangeRepository.replaceById(id, titleChange);
  }

  @del('/title-changes/{id}', {
    responses: {
      '204': {
        description: 'TitleChange DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.titleChangeRepository.deleteById(id);
  }
}
