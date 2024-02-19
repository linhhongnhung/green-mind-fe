import {
  List,
  Datagrid,
  TextField,
  ListProps,
  Create,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
} from "react-admin";

interface Categories {
  id: number;
  name: string;
  description: string;
}

interface CategoriesProps extends ListProps {
  data: Categories[];
  basePath: string;
}

export const CategoriesList: React.FC<CategoriesProps> = (props) => (
  <List {...props}>
    <Datagrid size="medium">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />

      <EditButton />
    </Datagrid>
  </List>
);

export const CreateCategory: React.FC<CategoriesProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);

export const EditCategory: React.FC<CategoriesProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);
