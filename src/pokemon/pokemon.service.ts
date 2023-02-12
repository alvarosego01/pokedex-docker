import { Injectable } from '@nestjs/common';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose/dist';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

    private defaultLimit: number;

    constructor(
        @InjectModel(Pokemon.name)
        private readonly _pokemonModel: Model<Pokemon>,
        private readonly _configService: ConfigService
    ) {

        this.defaultLimit = _configService.get<number>('defaultLimit');

    }

    async create(createPokemonDto: CreatePokemonDto) {

        createPokemonDto.name = createPokemonDto.name.toLowerCase();

        try {
            const pokemon = await this._pokemonModel.create(createPokemonDto);
            return pokemon;

        } catch (error) {

            this.handleExeptions(error);

        }


    }

    findAll() {


        return this._pokemonModel.find();

    }

    async findOne(term: string) {
        // return `This action returns a #${id} pokemon`;
        let pokemon: Pokemon;

        // mongo id
        if (isValidObjectId(term)) {
            pokemon = await this._pokemonModel.findById(term);
        }

        // is int
        if (!pokemon && !isNaN(+term)) {
            pokemon = await this._pokemonModel.findOne({
                no: term
            })
        }

        // Name
        if (!pokemon) {
            pokemon = await this._pokemonModel.findOne({
                name: term.toLowerCase().trim()
            });
        }


        if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${term}", not found`);

        return pokemon;
    }

    async update(term: string, updatePokemonDto: UpdatePokemonDto) {

        const pokemon = await this.findOne(term);

        if (updatePokemonDto.name) {
            updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
        }

        try {
            await pokemon.updateOne(updatePokemonDto, {
                new: true
            });

            return { ...pokemon.toJSON(), ...this.update };

        } catch (error) {

            this.handleExeptions(error);

        }


    }

    async remove(id: string) {

        // const res = await this._pokemonModel.findByIdAndDelete(id);

        const { deletedCount } = await this._pokemonModel.deleteOne({ _id: id });

        if (deletedCount === 0) {
            throw new BadRequestException(`Pokemon with id "${id}" not found`)
        }

        return;

    }

    private handleExeptions(error: any) {

        if (error.code === 11000) {

            throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`);

        }

        throw new InternalServerErrorException(`Can't create or update Pokemon - Check server logs`);


    }
}
