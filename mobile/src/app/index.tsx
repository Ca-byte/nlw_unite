import { Input } from "@/components/input"
import { useState } from "react"
import { Alert, Image, StatusBar, View } from "react-native"

import { Button } from "@/components/button"
import { api } from "@/server/api"
import { colors } from "@/styles/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, Redirect } from "expo-router"
import { useBadgeStore } from "./store/badge-store"


export default function Home(){
	const [ticketCode, setTicketCode] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const badgeStore = useBadgeStore()
	console.log("DADOS", badgeStore.data)

	async function handleAccessCredential(){
		try {
			if(!ticketCode.trim()){
				return Alert.alert("Credential", "Inform ticket code!")
			}
			setIsLoading(true)

			const { data } = await api.get(`/attendees/${ticketCode}/badge`)
			badgeStore.save(data.badge)

		} catch(error) {
			console.log(error)
			setIsLoading(false)

			Alert.alert("credential", "Credential not found!")
		} 
	}

	if(badgeStore.data?.checkInURL){
		return <Redirect href="/ticket" />
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
					<MaterialCommunityIcons 
						name="ticket-confirmation-outline"
						color={colors.green[200]}
						size={20}
					/>
					<Input.Field 
						placeholder="Ticket code" 
						onChangeText={setTicketCode}
					/>
				</Input>

				<Button 
					title="Access Credential" 
					onPress={handleAccessCredential}
					isLoading={isLoading}
				/>

				<Link href="/register" className="text-gray-100 font-bold text-center mt-8">
					Do you still not have credentials??
				</Link>
			</View>
		</View>
	)
}
