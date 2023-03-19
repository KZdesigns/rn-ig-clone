import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import { ImagePicker } from ‘expo’;

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A url is required."),
  caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const PlaceHolderImage = "https://img.icons8.com/ios/256/FFFFFF/image.png";

const FormikPostUploader = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PlaceHolderImage);

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => console.log(values)}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 10,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: thumbnailUrl ? thumbnailUrl : PlaceHolderImage }}
              style={{ width: 100, height: 100, marginHorizontal: 10 }}
            />

            <TextInput
              style={{ color: "white", fontSize: 20, marginTop: 12 }}
              placeholder="Write a caption"
              placeholderTextColor="gray"
              multiline={true}
              onChangeText={handleChange("caption")}
              onBlur={handleBlur("caption")}
              value={values.caption}
            />
          </View>
          <Divider width={0.2} orientation="horizontal" />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{ color: "white", fontSize: 18 }}
            placeholder="Enter image url"
            placeholderTextColor="gray"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button
            onPress={handleSubmit}
            title="Share"
            disabled={!isValid}
          ></Button>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({});


{/* <Button
icon="add-a-photo" mode="contained" style={styles.button}
onPress={() => {this._pickImage(handleChange('image'))}}
>Pick an image from camera roll</Button>
{values.image && values.image.length > 0 ?
<Image source={{ uri: values.image }} style={{ width: 200, height: 200 }} /> : null} */}