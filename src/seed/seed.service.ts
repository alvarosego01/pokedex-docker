import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokeResponse_I } from './interfaces/poke-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {


    constructor(
        @InjectModel(Pokemon.name)
        private readonly _pokemonModel: Model<Pokemon>,
        private readonly _http: AxiosAdapter
    ) {

    }

    async executeSeed() {

        await this._pokemonModel.deleteMany({});

        const data  = await this._http._get<PokeResponse_I>('https://pokeapi.co/api/v2/pokemon?limit=100');

        const pokemonsToInsert: CreatePokemonDto[] = [];

        // const insertPromisesArray = [];


        await data.results.forEach(({ name, url }) => {

            let segments = url.split('/');
            let no: number = Number(segments[segments.length - 2]);

            pokemonsToInsert.push(
                {
                    name: name,
                    no: no
                }
            )

        });

        await this._pokemonModel.insertMany(pokemonsToInsert);

        // await Promise.all(
        //     insertPromisesArray
        // );

        return 'Seed executed';
    }



}
