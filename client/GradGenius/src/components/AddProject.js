import {useState} from 'react';
import useConfigFormProject from '../hooks/useConfigFormProject';
import Form from './Form';
import {Text, View} from 'react-native';
import {Button, Switch} from 'react-native-paper';
import {pick, types} from '@react-native-documents/picker';

function AddProject({setIsShowCreateProject}) {
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState('');

  const [isWithDocumentation, setIsWithDocumentation] = useState(false);

  function switchIsWithDocumentation() {
    setIsWithDocumentation(!isWithDocumentation);
  }

  function onRequestProject(formState) {
    console.log(formState);
    // setIsShowCreateProject()
  }

  async function onFileUpload() {
    try {
      const pickedFile = await pick({
        allowMultiSelection: false,
        type: [types.pdf, types.docx, types.doc],
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={{backgroundColor: '#F2F2F2', flex: 1}}>
      <View style={{paddingTop: '2%', paddingRight: '3%'}}>
        <Button
          icon="close-thick"
          mode="contained"
          style={{
            backgroundColor: '#616162',
            alignSelf: 'flex-end',
          }}
          onPress={() => setIsShowCreateProject(false)}>
          Close
        </Button>
      </View>

      {isWithDocumentation && (
        <Button
          title="Save some text file to a user-defined location"
          onPress={onFileUpload}
        />
      )}

      <Form
        configForm={useConfigFormProject()}
        isLoading={isLoading}
        onSubmit={onRequestProject}
        responseError={responseError}
        submitIcon={'plus'}
        submitText={'Request a project'}
        submitStyle={{backgroundColor: '#181819'}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingTop: '3%',
            }}>
            <Text>
              {isWithDocumentation
                ? 'With Documentation'
                : 'Without Documentation'}
            </Text>
            <Switch
              color="#181819"
              theme={{
                colors: {
                  primary: '#181819',
                  accent: '#181819',
                },
              }}
              thumbColor={isWithDocumentation ? '#181819' : '#767577'}
              trackColor={{
                false: '#767577',
                true: '#181819',
              }}
              value={isWithDocumentation}
              onValueChange={switchIsWithDocumentation}
            />
          </View>
        </View>
      </Form>
    </View>
  );
}
export default AddProject;
