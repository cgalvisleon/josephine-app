#!/bin/sh

COMENTARIO="$1"

npm run build

if [ -z "$COMENTARIO" ]
then
  echo ""
  echo "¡Defina un comentario!"
  echo ""
else
  git add .
  git commit -m "$COMENTARIO"
  git push -u origin --all
  git push -u origin --tags
  ssh -i dploy.pem ubuntu@ec2-3-236-212-228.compute-1.amazonaws.com
  echo ""
  echo "Process Finished"
  echo ""
fi
