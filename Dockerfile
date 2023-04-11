FROM alpine:latest AS build

ARG THREADS=1
ARG APIKEY=''

COPY ./SimulationCraft /app/SimulationCraft/

# install Dependencies
RUN apk --no-cache add --virtual build_dependencies \
            compiler-rt-static \
            curl-dev \
            clang-dev \
            llvm \
            g++ \
            make \
            git

# Build
RUN clang++ -v && make -C /app/SimulationCraft/engine release CXX=clang++ -j $THREADS THIN_LTO=1 LLVM_PGO_GENERATE=1 OPTS+="-Os -mtune=generic" SC_DEFAULT_APIKEY={$APIKEY}


# Collect profile guided instrumentation data
RUN cd /app/SimulationCraft/engine && LLVM_PROFILE_FILE="code-%p.profraw" ./simc T26_Raid.simc single_actor_batch=1 iterations=100

# Merge profile guided data
RUN cd /app/SimulationCraft/engine && llvm-profdata merge -output=code.profdata code-*.profraw

# Clean & rebuild with collected profile guided data.
RUN make -C /app/SimulationCraft/engine clean && make -C /app/SimulationCraft/engine release CXX=clang++ -j $THREADS THIN_LTO=1 LLVM_PGO_USE=./code.profdata OPTS+="-Os -mtune=generic" SC_DEFAULT_APIKEY={$APIKEY}

# Cleanup dependencies
RUN apk del build_dependencies

# typescript api
FROM node:16-alpine as api

RUN apk --no-cache add --virtual build_dependencies \
        libcurl \
        libgcc \
        libstdc++

COPY --from=build /app/SimulationCraft/engine/simc /app/SimulationCraft/engine/simc
COPY ./api/apikey.txt ./app/api/
RUN echo $BLIZZARD_KEY ~/.simc_apikey

# ENV S3_ACCESS_KEY=
# ENV S3_SECRET_KEY=
COPY ./api/.env ./app/api/

COPY ./api/package*.json ./app/api/
RUN yarn install
COPY ./api ./app/api

WORKDIR /app/api
CMD yarn run start:prod
