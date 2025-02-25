import React, { useState, useEffect } from "react";
import { useClient } from "sanity";
import {
  Button,
  Checkbox,
  Stack,
  Text,
  Card,
  Flex,
  Box,
  Select,
  Grid,
  Heading,
  ToastProvider,
  useToast,
  Container,
} from "@sanity/ui";
import { loadQuery } from "../lib/load-query";
import { urlForImage } from "../lib/urlForImage";

const BulkDeleteTool = () => {
  const client = useClient({ apiVersion: "2021-06-07" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const toast = useToast();

  const fetchDocumentTypes = async () => {
    const result = await client.fetch(
      '*[_type != "system.group" && _type != "system.retention" && _type != "sanity.imageAsset" && _type != "SocialLink"] | order(_type) { _type }'
    );
    const uniqueTypes = [...new Set(result.map((doc) => doc._type))];
    setDocumentTypes(uniqueTypes);
  };

  const fetchDocuments = async () => {
    if (!selectedType) return;
    const { data } = await loadQuery({
      query: `*[_type == "${selectedType}"] | order(_createdAt) {_id, title, mainImage{asset->{url, metadata{dimensions}}}}`,
      params: {},
    });
    setDocuments(data);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar las publicaciones seleccionadas?"
      )
    ) {
      try {
        await client.delete({
          query: "*[_id in $ids]",
          params: { ids: selectedIds },
        });
        toast.push({
          status: "success",
          title: "Éxito",
          description:
            "Publicaciones eliminadas correctamente. Esto puede tardar unos segundos en reflejarse.",
        });
        setSelectedIds([]);
        fetchDocuments();
      } catch (error) {
        toast.push({
          status: "error",
          title: "Error",
          description:
            "Error al eliminar las publicaciones. Inténtalo de nuevo.",
        });
      }
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const urlFor = (source) => {
    const { width, height } = source.asset.metadata.dimensions;
    const rectWidth = Math.min(4097, width);
    const rectHeight = Math.min(4097, height);
    return urlForImage(source)
      .rect(0, 0, rectWidth, rectHeight)
      .width(33)
      .height(33)
      .fit("crop")
      .url();
  };

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [selectedType]);

  return (
    <ToastProvider>
      <Container
        width={2}
        display={"flex"}
        style={{
          flexDirection: "column",
          height: "90svh",
          maxHeight: "100%",
          marginTop: "20px",
        }}
      >
        <Box padding={4}>
          <Stack space={4}>
            <Heading as="h1" size={2}>
              Herramienta de Eliminación Masiva
            </Heading>
            <Text size={1}>
              Selecciona un tipo de documento y marca las publicaciones que
              deseas eliminar. Luego, haz clic en "Eliminar seleccionados" para
              eliminarlas.
            </Text>
            <Select
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
            >
              <option value="" disabled>
                Selecciona un tipo de documento
              </option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </Stack>
        </Box>
        <Box
          display={"flex"}
          style={{ flex: 1, flexDirection: "column" }}
          padding={4}
        >
          <Grid columns={[1, 2, 2, 3]} gap={4}>
            {documents.map((doc) => (
              <Card key={doc._id} padding={4} shadow={1} radius={2}>
                <Flex gap={2}>
                  <Checkbox
                    checked={selectedIds.includes(doc._id)}
                    onChange={() => handleSelect(doc._id)}
                  />
                  {doc.mainImage && doc.mainImage.asset ? (
                    <img
                      src={urlFor(doc.mainImage)}
                      alt={doc.title}
                    />
                  ) : (
                    <Text>Sin imagen</Text>
                  )}
                  <Text
                    style={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {doc.title}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Box>
        <Box marginY={4} paddingX={4}>
          <Text size={1} tone="critical">
            Asegúrate de seleccionar correctamente lo que deseas eliminar, ya
            que esta acción es irreversible.
          </Text>
          <Button
            text="Eliminar seleccionados"
            tone="critical"
            onClick={handleDelete}
            style={{ marginTop: "20px" }}
          />
        </Box>
      </Container>
    </ToastProvider>
  );
};

export default BulkDeleteTool;
