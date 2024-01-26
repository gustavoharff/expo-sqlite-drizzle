import 'react-native-get-random-values'

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';

import migrations from './drizzle/migrations';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/lib/db'
import { users as usersSchema } from '@/lib/drizzle/schema';
import { useForceUpdate } from '@/hooks/use-force-update';
import { UsersList } from '@/components/users-list';

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [forceUpdate, forceUpdateId] = useForceUpdate()

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

  async function handleAddUser() {
    await db.insert(usersSchema).values({
      name,
      email
    })

    forceUpdate()

    setName('')
    setEmail('')
  }

  return (
    <View style={[styles.container, { padding: 16, gap: 8 }]}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={{
              flex: 1,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#bbb',
              minWidth: 200,
              padding: 8,
            }}
          />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={{
            flex: 1,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#bbb',
            minWidth: 200,
            padding: 8,
          }}
        />

        <Button 
          title='Add' 
          onPress={handleAddUser}
        />
      </View>

      <UsersList
        key={'users-list-' + forceUpdateId}
      />

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
