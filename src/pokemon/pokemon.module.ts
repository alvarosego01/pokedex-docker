import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';


const POKEMON_SCHEMA =  MongooseModule.forFeature([
            {
                name: Pokemon.name,
                schema: PokemonSchema,
            }
        ])

@Module({
    controllers: [PokemonController],
    providers: [PokemonService],
    imports: [
        ConfigModule,
        POKEMON_SCHEMA
    ],
    exports: [
        MongooseModule,
    ]
})
export class PokemonModule { }
