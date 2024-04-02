import { Input } from "@/components/input"
import { Image, View } from "react-native"

import { Button } from "@/components/button"
import { colors } from "@/styles/colors"
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { StatusBar } from "react-native"

export default function Register(){
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
					<Input.Field placeholder="Full name"/>
				</Input>
				<Input>
					<MaterialIcons 
						name="alternate-email"
						keyboard="email-address"
						color={colors.green[200]}
						size={20}
					/>
					<Input.Field placeholder="E-mail"/>
				</Input>


				<Button title="Register" />
				<Link href="/register" className="text-gray-100 font-bold text-center mt-8">
					Are you already have ticket?
				</Link>
			</View>
		</View>
	)
}
