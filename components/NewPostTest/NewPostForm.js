import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { getDatabase, set } from "firebase/database";
import axios from "axios";
import uploadFile from "../../util/uploadFile";
import uploadObj from "../../util/uploadObj";

const photoSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  photo: yup.mixed().required("A photo is required"),
});

const NewPostForm = ({ navigation }) => {
  return (
    <>
      <Formik
        initialValues={{ title: "", description: "", photo: null }}
        validationSchema={photoSchema}
        onSubmit={async (values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("title", values.title);
          formData.append("description", values.description);
          formData.append("photo", {
            uri: values.photo.assets[0].uri,
            type: values.photo.assets[0].type,
            name: values.photo.assets[0].fileName || "photo.jpg",
          });
          console.log(formData._parts[0][1]);
          console.log(formData._parts[1][1]);
          try {
            const url = await uploadFile(formData._parts[2][1].uri);
            console.log(url);
            const data = {
              title: formData._parts[0][1],
              description: formData._parts[1][1],
              imageUri: url,
            };
            await uploadObj(data);
            alert("Your post has been uploaded!");
            setSubmitting(false);
          } catch (error) {
            alert("There was an error try again!");
            console.log(error);
            setSubmitting(false);
          }
        }}
      >
        {(formikProps) => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TextInput
              // style={styles.input}
              placeholder="Title"
              onChangeText={formikProps.handleChange("title")}
              onBlur={formikProps.handleBlur("title")}
              value={formikProps.values.title}
            />
            {formikProps.touched.title && formikProps.errors.title && (
              <Text>{formikProps.errors.title}</Text>
            )}

            <TextInput
              // style={styles.input}
              placeholder="Description"
              onChangeText={formikProps.handleChange("description")}
              onBlur={formikProps.handleBlur("description")}
              value={formikProps.values.description}
            />
            {formikProps.touched.description &&
              formikProps.errors.description && (
                <Text>{formikProps.errors.description}</Text>
              )}

            <Button
              title="Select photo"
              onPress={async () => {
                // Handle photo selection here
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [16, 9],
                  quality: 1,
                  suppressDeprecationWarnings: true,
                });
                if (!result.canceled) {
                  formikProps.setFieldValue("photo", result);
                }
              }}
            />
            {formikProps.touched.photo && formikProps.errors.photo && (
              <Text>{formikProps.errors.photo}</Text>
            )}

            <Button
              title="Submit"
              onPress={formikProps.handleSubmit}
              disabled={formikProps.isSubmitting}
            />
            <Button
              title="view screen"
              onPress={() => navigation.navigate("show-photos")}
            />
          </View>
        )}
      </Formik>
    </>
  );
};

export default NewPostForm;
