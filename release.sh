#!/bin/bash

# Set variables
GITLAB_TOKEN="glpat-kDZ2r9FPsukdxxKToBJa"  # Replace with your GitLab personal access token
PROJECT_ID="65769590"                     # Correct project ID
TAG_NAME="v0.0.0"                         # Replace with your desired release tag name
RELEASE_NAME="Release v0.0.0"             # Replace with your release name
RELEASE_DESCRIPTION="Description of the release." # Add your release description
FILES=("dist/FSCC App Setup 0.0.0.dmg") # List of files to upload

# Create a new tag
echo "Creating a tag: $TAG_NAME..."
curl --request POST \
  --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  --data "tag_name=$TAG_NAME" \
  --data "ref=main" \
  --data "message=Release $TAG_NAME" \
  --data "release_description=$RELEASE_DESCRIPTION" \
  "https://gitlab.com/api/v4/projects/$PROJECT_ID/repository/tags"

# Upload files and collect their URLs
declare -a UPLOAD_URLS
for FILE in "${FILES[@]}"; do
  echo "Uploading file: $FILE..."
  RESPONSE=$(curl --silent --request POST \
    --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
    --form "file=@$FILE" \
    "https://gitlab.com/api/v4/projects/$PROJECT_ID/uploads")
  UPLOAD_URL=$(echo $RESPONSE | jq -r '.url')
  UPLOAD_URLS+=("$UPLOAD_URL")
done

# Create a release and link the uploaded files
echo "Creating release: $RELEASE_NAME..."
ASSETS=""
for URL in "${UPLOAD_URLS[@]}"; do
  BASENAME=$(basename $URL)
  ASSETS+="--data \"assets[links][][name]=$BASENAME\" --data \"assets[links][][url]=https://gitlab.com/$PROJECT_ID/uploads/$URL\" "
done

eval curl --request POST \
  --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  --data "name=$RELEASE_NAME" \
  --data "tag_name=$TAG_NAME" \
  --data "description=$RELEASE_DESCRIPTION" \
  $ASSETS \
  "https://gitlab.com/api/v4/projects/$PROJECT_ID/releases"

echo "Release $RELEASE_NAME created successfully!"
