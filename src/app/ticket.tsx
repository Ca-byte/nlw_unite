import { Button } from "@/components/button";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { QRCode } from "@/components/qrcode";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import {
	Alert,
	Modal,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View
} from "react-native";

export default function Ticket(){
	const [image, setImage] = useState("")
	const [expandQRCode, setExpandQRCode] = useState(false)

	async function handleSelectImage(){
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4,4],
			})

			if(result.assets){
				setImage(result.assets[0].uri)
			}
			
		} catch (error) {
			console.log(error)
			Alert.alert("Foto", " Not possible selected image." )
			
		}
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
					image={image} 
					onChangeAvatar={handleSelectImage}
					onExpandQRCode={() => setExpandQRCode(true)}

					/>
				<FontAwesome 
					name="angle-double-down"
					size={24} 
					color={colors.gray[300]}
					className="self-center my-6"
				/>
				<Text className="text-white font-bold text-2xl mt-4">
					Share credential
				</Text>
				<Text className="text-white font-regular text-base mt-1 mb-6">
					Show the world that you will attend The Unite Summit!
				</Text>
				<Button title="Share"/>

				<TouchableOpacity
					activeOpacity={0.7} 
					className="mt-10"
				>
					<Text className="text-white text-base text-center font-bold">Remove Credential</Text>
				</TouchableOpacity>
			</ScrollView>
			<Modal visible={expandQRCode} statusBarTranslucent animationType="slide">
				<View className="flex-1 bg-green-500 items-center justify-center">
					<TouchableOpacity activeOpacity={0.7} onPress={() => setExpandQRCode(false)}>
						<QRCode value="carol" size={300} />
						<Text className="font-body text-orange-500 text-sm text-center mt-10">
							Close
						</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	)
}