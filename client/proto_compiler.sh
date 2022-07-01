set -e

PROTO_DIR=".."
FILE_PATH="../chat.proto"
OUTPUT_DIR="./src"

protoc -I $PROTO_DIR \
  --js_out=import_style=commonjs,binary:$OUTPUT_DIR \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$OUTPUT_DIR \
  $FILE_PATH
