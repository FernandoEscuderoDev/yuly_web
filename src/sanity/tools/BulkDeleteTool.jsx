import React, { useState, useEffect } from 'react';
import { useClient } from 'sanity';
import { Button, Checkbox, Stack, Text, Card, Flex, Box, Select, Grid, Heading } from '@sanity/ui';
import { loadQuery } from '../lib/load-query';
import { urlForImage } from '../lib/urlForImage';

const BulkDeleteTool = () => {
  const client = useClient({ apiVersion: "2021-06-07" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const fetchDocumentTypes = async () => {
    const result = await client.fetch('*[_type != "system.group" && _type != "system.retention" && _type != "sanity.imageAsset" && _type != "SocialLink"] | order(_type) { _type }');
    const uniqueTypes = [...new Set(result.map((doc) => doc._type))];
    setDocumentTypes(uniqueTypes);
  };

  const fetchDocuments = async () => {
    if (!selectedType) return;
    const { data } = await loadQuery({
      query: `*[_type == "${selectedType}"]{_id, title, mainImage{asset->{url, metadata{dimensions}}}}`,
      params: {},
    });
    setDocuments(data);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar las publicaciones seleccionadas?')) {
      await client.delete({ query: '*[_id in $ids]', params: { ids: selectedIds } });
      fetchDocuments();
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const urlFor = (source) => {
    const { width, height } = source.asset.metadata.dimensions;
    const rectWidth = Math.min(4097, width);
    const rectHeight = Math.min(4097, height);
    return urlForImage(source).rect(0, 0, rectWidth, rectHeight).width(33).height(33).fit('crop').url();
  };

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [selectedType]);

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Heading as="h1" size={2}>Herramienta de Eliminación Masiva</Heading>
        <Text size={1}>Selecciona un tipo de documento y marca las publicaciones que deseas eliminar. Luego, haz clic en "Eliminar seleccionados" para eliminarlas.</Text>
        <Select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
          <option value="" disabled>Selecciona un tipo de documento</option>
          {documentTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
        <Grid columns={[1, 2, 3]} gap={4}>
          {documents.map((doc) => (
            <Card key={doc._id} padding={4} shadow={1} radius={2}>
              <Flex align="center">
                <Checkbox
                  checked={selectedIds.includes(doc._id)}
                  onChange={() => handleSelect(doc._id)}
                />
                {doc.mainImage && doc.mainImage.asset ? (
                  <img
                    src={urlFor(doc.mainImage)}
                    alt={doc.title}
                    style={{ width: '50px', height: '50px', marginLeft: '10px' }}
                  />
                ) : (
                  <Text style={{ marginLeft: '10px' }}>Sin imagen</Text>
                )}
                <Text style={{ marginLeft: '10px' }}>{doc.title}</Text>
              </Flex>
            </Card>
          ))}
        </Grid>
        <Text size={1} tone="critical">Asegúrate de seleccionar correctamente lo que deseas eliminar, ya que esta acción es irreversible.</Text>
        <Button text="Eliminar seleccionados" tone="critical" onClick={handleDelete} />
      </Stack>
    </Box>
  );
};

export default BulkDeleteTool;