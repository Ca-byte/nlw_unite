import { Button } from "@/components/button";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { QRCode } from "@/components/qrcode";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { MotiView } from "moti";
import { useState } from "react";
import {
	Alert,
	Modal,
	ScrollView,
	Share,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { Redirect } from "expo-router";
import { useBadgeStore } from "./store/badge-store";


export default function Ticket(){
	const [expandQRCode, setExpandQRCode] = useState(false)

	const badStore = useBadgeStore()

	async function handleShare(){
		try {
			if(badStore.data?.checkInURL){
				await Share.share({
					message: badStore.data.checkInURL,
				})
			}
		} catch (error) {
			console.log(error)
			Alert.alert("Share", "Oh no It was not possible to share it!")
			
		}
	}

	async function handleSelectImage(){
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4,4],
			})

			if(result.assets){
				badStore.updateAvatar(result.assets[0].uri)
			}
			
		} catch (error) {
			console.log(error)
			Alert.alert("Foto", " Not possible selected image." )
			
		}
	}

	if(!badStore.data?.checkInURL){
		return <Redirect href="/" />
	}
	
	return(
		<View className="flex-1 bg-green-500">
			<StatusBar barStyle="light-content"/>
			<Header title= "My Credential" />
			<ScrollView 
				className="-mt-28 -z-10" 
				contentContainerClassName="px-8 pb-8"
				showsVerticalScrollIndicator={false}
			>
				<Credential 
					data={badStore.data}
					onChangeAvatar={handleSelectImage}
					onExpandQRCode={() => setExpandQRCode(true)}

				/>
				<MotiView
				from={{
					translateY: 0

				}}
				animate={{
					translateY: 10

				}}
				transition={{
					loop: true,
					type: "timing",
					duration: 700
				}}
				>
					<FontAwesome 
						name="angle-double-down"
						size={24} 
						color={colors.gray[300]}
						className="self-center my-6"
					/>
				</MotiView>
				<Text className="text-white font-bold text-2xl mt-4">
					Share credential
				</Text>
				<Text className="text-white font-regular text-base mt-1 mb-6">
					Show the world that you will attend The {badStore.data.eventTitle}!
				</Text>
				<Button title="Share" onPress={handleShare}/>

				<TouchableOpacity
					activeOpacity={0.7} 
					className="mt-10"
					onPress={() => badStore.remove()}
				>
					<Text className="text-white text-base text-center font-bold">
						Remove Credential
					</Text>
				</TouchableOpacity>
			</ScrollView>
			<Modal visible={expandQRCode} statusBarTranslucent animationType="slide">
				<View className="flex-1 bg-green-500 items-center justify-center">
					<TouchableOpacity activeOpacity={0.7} onPress={() => setExpandQRCode(false)}>
						<QRCode value={badStore.data.checkInURL} size={300} />
						<Text className="font-body text-orange-500 text-sm text-center mt-10">
							Close
						</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	)
}