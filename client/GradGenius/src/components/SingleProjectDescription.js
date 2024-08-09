import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, ProgressBar, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SingleProjectDescription = ({project}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.name}>{project.name}</Text>

          {project.progress / 100 === 1 ? (
            <Icon name="done-all" size={24} color="#32CD32" />
          ) : (
            <Icon name="pending-actions" size={24} color="#FFA500" />
          )}
        </View>
        <View style={styles.body}>
          <Text style={styles.status}>{project.status}</Text>
          <ProgressBar
            progress={project.progress / 100}
            style={styles.progress}
            color="#181819"
          />
          <Text style={styles.progressText}>{project.progress}%</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: '2%',
    marginHorizontal: '2%',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  body: {
    paddingTop: '5%',
  },
  status: {
    fontSize: 16,
    color: '#666',
    paddingBottom: '3%',
  },
  progress: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  progressText: {
    paddingTop: '2%',
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
});

export default SingleProjectDescription;
