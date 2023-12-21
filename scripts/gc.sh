#! /bin/bash

NAME=$1

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../packages" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: yarn gc \${name} with no space"
  exit 1
fi

DIRNAME="$FILE_PATH/components/$NAME"
INPUT_NAME=$NAME

if [ -d "$DIRNAME" ]; then
  echo "$NAME component already exists, please change it"
  exit 1
fi

NORMALIZED_NAME=""
for i in $(echo $NAME | sed 's/[_|-]\([a-z]\)/\ \1/;s/^\([a-z]\)/\ \1/'); do
  C=$(echo "${i:0:1}" | tr "[:lower:]" "[:upper:]")
  NORMALIZED_NAME="$NORMALIZED_NAME${C}${i:1}"
done
NAME=$NORMALIZED_NAME

mkdir -p "$DIRNAME"
mkdir -p "$DIRNAME/style"

cat > $FILE_PATH/theme-chalk/src/components/$INPUT_NAME.scss <<EOF
@use '../mixins/bem.scss' as *;
@use '../mixins/function.scss' as *;
@use '../common/var.scss' as *;
@use '../mixins/_var' as *;
EOF

cat > $DIRNAME/style/index.css <<EOF
@import '@cotton-ui/theme-chalk/src/base.scss';
@import '@cotton-ui/theme-chalk/src/components/${INPUT_NAME}.scss';
EOF

cat > $DIRNAME/index.tsx <<EOF
import './style/index.css'
import * as React from 'react'

export interface ${NAME}Props {

}

const ${NAME}: React.FC<${NAME}Props> = props => {
  return (
    
  )
}

if (process.env.NODE_ENV !== 'production') {
  ${NAME}.displayName = '${NAME}';
}

export default ${NAME}
EOF


