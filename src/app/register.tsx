import { Input } from "@/components/input"
import { Alert, Image, View } from "react-native"

import { Button } from "@/components/button"
import { api } from "@/server/api"
import { colors } from "@/styles/colors"
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import axios from "axios"
import { Link, router } from "expo-router"
import { useState } from "react"
import { StatusBar } from "react-native"


export default function Register(){
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33"

	async function handleRegister(){
		try {
			if(!name.trim() || !email.trim()){
				return Alert.alert("Register", "Fill in all fields!")
			}

			setIsLoading(isLoading)

			const registerResponse = await api.post(`events/${EVENT_ID}/attendees`, { 
				name, 
				email
			})

			if(registerResponse.data.attendeeId){
				return Alert.alert("Register", "Well done! You are in!", [
					{text: "OK", onPress: ()=> router.push("/ticket")}
				])
			}

			
		} catch(error){
			console.log(error)
			setIsLoading(false)

			if(axios.isAxiosError(error)){
				if(String(error.response?.data.message).includes("already registered")){
					return Alert.alert("Register", "This E-mail is registered!")
				}
			}
			Alert.alert("Register", "It was not possible to register!")
			
		} 
	}

	return(
		<View className="flex-1 bg-green-500 items-center justify-center">
			<StatusBar barStyle="light-content"/>
			<Image 
				source={require("@/assets/logo.png")} 
				className="h-16" 
				resizeMode="contain" 
			/>
			<View className="w-full mt-12 px-6 gap-3">
				<Input>
					<FontAwesome6 
						name="user-circle"
						color={colors.green[200]}
						size={20}
					/>
					<Input.Field 
						placeholder="Full name"
						onChangeText={setName}
					/>
				</Input>
				<Input>
					<MaterialIcons 
						name="alternate-email"
						keyboard="email-address"
						color={colors.green[200]}
						size={20}
					/>
					<Input.Field 
						placeholder="E-mail"
						onChangeText={setEmail}
					/>
				</Input>


				<Button 
					title="Register" 
					onPress={handleRegister} 
					isLoading={isLoading}
				/>

				<Link href="/register" className="text-gray-100 font-bold text-center mt-8">
					Are you already have ticket?
				</Link>
			</View>
		</View>
	)
}
