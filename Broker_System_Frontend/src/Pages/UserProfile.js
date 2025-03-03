import React, { useContext, useEffect, useState } from "react";
import ImageUploader from "../components/ImageUploader";
import AddAddress from "./OwnerPages/AddAddress";
import { AuthContext } from "../context/AuthContext";
import { useProperty } from "../context/PropertyContext";
import { getUsersByUid, updateUsersByid } from "../services/UserService";
import { FaCamera } from "react-icons/fa";
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase";
import "../i18n";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    residenceId: [],
    documents: [],
    officeId: [],
    driverLicense: [],
    passport: [],
    studentRenewalId: [],
    profilePicture: [],
    profilePictureBase64: "",
  });
  const [profilePreview, setProfilePreview] = useState("");
  const { uid } = useContext(AuthContext);
  const { addressId } = useProperty();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(" ");
  const [statusMessage, setStatusMessage] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getCurrentUserData = async () => {
      try {
        const response = await getUsersByUid(uid);
        console.log("Backend response:", response);
        setCurrentUser(response._id);

        // Get user data from Firestore
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const firestoreData = userDoc.data();
          console.log("Firestore data:", firestoreData);

          // Initialize all user data fields
          const newUserData = {
            firstName: firestoreData.firstName || "",
            middleName: firestoreData.middleName || "",
            lastName: firestoreData.lastName || "",
            email: firestoreData.email || "",
            phoneNumber: firestoreData.phoneNumber || "",
            profilePicture: firestoreData.photoURL || "",
            profilePictureBase64: firestoreData.photoURL || "",
            residenceId: [],
            documents: [],
            officeId: [],
            driverLicense: [],
            passport: [],
            studentRenewalId: [],
          };

          setUserData(newUserData);
          console.log("Set user data:", newUserData); 

          // Set profile preview if photoURL exists
          if (firestoreData.photoURL) {
            setProfilePreview(firestoreData.photoURL);
          } else {
            console.log("No profile picture found in Firestore");
          }
        } else {
          console.log("No Firestore document exists for user");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to load user data");
      }
    };

    if (uid) {
      getCurrentUserData();
    }
  }, [uid]);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File size validation (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size should be less than 5MB");
        return;
      }

      // Create base64 for preview and Firebase
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePreview(base64String);
        // Store both file and base64 in state
        setUserData(prevData => ({
          ...prevData,
          profilePicture: file,
          profilePictureBase64: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (fieldName, images) => {
    setUserData((prevData) => ({
      ...prevData,
      [fieldName]: images,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const updateUserChatsInfo = async (updatedUserInfo) => {
    try {
      const userChatsRef = doc(db, "userChats", uid);
      const userChatsDoc = await getDoc(userChatsRef);

      if (userChatsDoc.exists()) {
        const userChats = userChatsDoc.data();
        // converts the userChats object into an array of key-value pairs.
        for (const [chatId, chatData] of Object.entries(userChats)) {
          const chatRef = doc(db, "chats", chatId);
          const chatDoc = await getDoc(chatRef);

          if (chatDoc.exists()) {
            const messages = chatDoc.data().messages || [];
            const updatedMessages = messages.map((msg) => {
              if (msg.senderId === uid) {
                return {
                  ...msg,
                  senderName: `${updatedUserInfo.firstName} ${updatedUserInfo.lastName}`,
                  senderPhoto: updatedUserInfo.photoURL,
                };
              }
              return msg;
            });
            await updateDoc(chatRef, {
              messages: updatedMessages,
            });
          }
          const otherUserId = chatId.replace(uid, "");
          if (otherUserId) {
            const otherUserChatsRef = doc(db, "userChats", otherUserId);
            const otherUserChatsDoc = await getDoc(otherUserChatsRef);

            if (otherUserChatsDoc.exists()) {
              await updateDoc(otherUserChatsRef, {
                [`${chatId}.userInfo`]: {
                  ...chatData.userInfo,
                  uid: uid,
                  displayName: `${updatedUserInfo.firstName} ${updatedUserInfo.lastName}`,
                  photoURL: updatedUserInfo.photoURL,
                },
              });
            }
          }
          await updateDoc(userChatsRef, {
            [`${chatId}.userInfo`]: {
              ...chatData.userInfo,
              uid: uid,
              displayName: `${updatedUserInfo.firstName} ${updatedUserInfo.lastName}`,
              photoURL: updatedUserInfo.photoURL,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error updating user chats:", error);
      throw error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("Updating profile...");
    try {
      const data = new FormData();
      data.append("firstName", userData.firstName);
      data.append("middleName", userData.middleName);
      data.append("lastName", userData.lastName);
      data.append("email", userData.email);
      data.append("phoneNumber", userData.phoneNumber);
      data.append("userId", currentUser);
      data.append("addressId", addressId);
      if (userData.profilePicture instanceof File) {
        data.append("profilePicture", userData.profilePicture);
      }
      if (userData.documents?.length) {
        data.append("documents", userData.documents[0]);
      }
      if (userData.officeId?.length) {
        data.append("officeId", userData.officeId[0]);
      }
      if (userData.driverLicense?.length) {
        data.append("driverLicense", userData.driverLicense[0]);
      }
      if (userData.passport?.length) {
        data.append("passport", userData.passport[0]);
      }
      if (userData.studentRenewalId?.length) {
        data.append("studentRenewalId", userData.studentRenewalId[0]);
      }
      if (userData.residenceId?.length) {
        data.append("residenceId", userData.residenceId[0]);
      }
      console.log("Sending data to backend...");
      const response = await updateUsersByid(currentUser, data);
      setUserData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        residenceId: [],
        documents: [],
        officeId: [],
        driverLicense: [],
        passport: [],
      })
      console.log("Backend response:", response);
      const updatedUserInfo = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        middleName: userData.middleName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        photoURL: userData.profilePictureBase64 || null, 
      };

      // Update or create Firestore user data
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          ...updatedUserInfo,
          createdAt: serverTimestamp(),
        });
        console.log("Created new Firestore document");
      } else {
        await updateDoc(userDocRef, updatedUserInfo);
        console.log("Updated existing Firestore document");
      }

      // Update user chats with new info
      await updateUserChatsInfo(updatedUserInfo);
      console.log("Updated user chats");

      setStatusMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatusMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('am')}>አማርኛ</button>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t('Profile Information')}</h1>
            <p className="mt-2 text-sm text-gray-600">
            {t('Update your personal information and documents')} </p>
          </div>

          {/* Address Section */}
          <div className="bg-white rounded-xl shadow-sm mb-8 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('Address Details')} </h2>
            <AddAddress />
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-4">
                <label className="text-sm font-medium text-gray-700"> {t('Profile Picture')}</label>
                <div className="relative">
                  <div className="w-40 h-40 rounded-full border-4 border-emerald-500/20 overflow-hidden bg-gray-50">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        {t('No Image')}
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="profilePicture"
                    className="absolute bottom-2 right-2 bg-emerald-500 text-white p-3 rounded-full cursor-pointer hover:bg-emerald-600 transition-colors duration-200 shadow-lg"
                  >
                    <input
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                    <FaCamera className="w-5 h-5" />
                  </label>
                </div>
              </div>

              {/* Personal Information Fields */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  {t('First Name')} 
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="middleName" className="text-sm font-medium text-gray-700">
                  {t('Middle Name')} 
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    id="middleName"
                    value={userData.middleName}
                    onChange={handleChange}
                    placeholder="Enter your middle name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  {t('Last Name')}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  {t('Email Address')} 
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                  {t('Phone Number')} 
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">{t('Residence ID')} </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <ImageUploader
                    key={userData.residenceId}
                    fieldName="residenceId"
                    onImageChange={handleImagesChange}
                    images={userData.residenceId}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">{t('Documents')} </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <ImageUploader
                    key={userData.documents}
                    fieldName="documents"
                    onImageChange={handleImagesChange}
                    images={userData.documents}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">{t('Office ID')} </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <ImageUploader
                    key={userData.officeId}
                    fieldName="officeId"
                    onImageChange={handleImagesChange}
                    images={userData.officeId}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">{t( 'Driver License')} </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <ImageUploader
                    key={userData.driverLicense}
                    fieldName="driverLicense"
                    onImageChange={handleImagesChange}
                    images={userData.driverLicense}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">{t('Passport')} </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <ImageUploader
                    key={userData.passport}
                    fieldName="passport"
                    onImageChange={handleImagesChange}
                    images={userData.passport}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">{t('Student Renewal ID')} </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <ImageUploader
                    key={userData.studentRenewalId}
                    fieldName="studentRenewalId"
                    onImageChange={handleImagesChange}
                    images={userData.studentRenewalId}
                  />
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {statusMessage && (
              <div className={`mt-6 p-4 rounded-lg ${
                statusMessage.includes('successfully') 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'bg-red-50 text-red-700'
              }`}>
                {statusMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200"
              >
               {t('Save Profile')} 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
