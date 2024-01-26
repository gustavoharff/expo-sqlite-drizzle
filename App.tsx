import 'react-native-get-random-values'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';

import migrations from './drizzle/migrations';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/lib/db'
import { users as usersSchema } from '@/lib/drizzle/schema';
import { useUsers } from '@/hooks/use-users';

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success) return;

    (async () => {
      const result = await db.select().from(usersSchema)

      if (result.length === 0) {
        await db.insert(usersSchema).values({
          name: 'John Doe',
          email: 'john.doe@email.com'
        })
      }

      console.log(result)
    })()
  }, [success])

  const users = useUsers()

  return (
    <View style={styles.container}>
      {users.map(user => (
        <Text key={user.id}>{user.name}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
