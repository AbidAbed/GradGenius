import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import SingleProjectDescription from '../components/SingleProjectDescription';
import {addProjects, useGetProjectsQuery} from '../store/Store';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'toastify-react-native';
import {Button} from 'react-native-paper';
import AddProject from '../components/AddProject';

// const projects = [
//   {name: 'MASAFAT', progress: 0, status: 'Pending'},
//   {name: 'Project B', progress: 50, status: 'In Progress'},
//   {name: 'Project C', progress: 100, status: 'Completed'},
// ];

function Projects() {
  const {token} = useSelector(state => state.config);
  const projects = useSelector(state => state.projects);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [isShowCreateProject, setIsShowCreateProject] = useState(false);

  const getProjectsResponse = useGetProjectsQuery({token, page});

  function handleNextPage() {
    if (getProjectsResponse.data.length !== 0) {
      setPage(page + 1);
      getProjectsResponse.refetch({token, page: page + 1});
    }
  }

  useEffect(() => {
    if (
      !getProjectsResponse.isLoading &&
      !getProjectsResponse.isUninitialized
    ) {
      if (getProjectsResponse.isError) {
        Toast.error('Error loading your projects');
      } else {
        dispatch(addProjects(getProjectsResponse.data));
      }
    }
  }, [getProjectsResponse]);

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={getProjectsResponse.isLoading} transparent={true}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={'#181819'} size={'large'} />
        </View>
      </Modal>

      <FlatList
        data={projects}
        keyExtractor={item => item.name}
        renderItem={({item}) => <SingleProjectDescription project={item} />}
        onEndReached={handleNextPage}
      />

      <Modal visible={isShowCreateProject}>
        <View style={{width: '100%', height: '100%'}}>
          <AddProject setIsShowCreateProject={setIsShowCreateProject} />
        </View>
      </Modal>

      <Button
        icon="plus"
        mode="contained"
        style={{alignSelf: 'flex-end', backgroundColor: '#181819'}}
        onPress={() => setIsShowCreateProject(true)}>
        Request a project
      </Button>
    </SafeAreaView>
  );
}
export default Projects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
