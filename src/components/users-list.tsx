import { useUsers } from "@/hooks/use-users";
import { Text, View } from "react-native";

export function UsersList() {
  const users = useUsers()

  return (
    <View 
      style={{ marginTop: 16 }}>
      {users.map(user => (
        <View 
          key={user.id} 
          style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
        </View>
      ))}
    </View>
  )
}