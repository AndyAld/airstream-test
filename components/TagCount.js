import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const TagCount = () => {
  const [tagCounts, setTagCounts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    axios
      .get("https://dummyjson.com/posts")
      .then((response) => {
        setLoading(true);
        setPosts(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const tagCountsDict = {};

    posts.forEach((post) => {
      const tags = post.tags;
      tags.forEach((tag) => {
        if (tag in tagCountsDict) {
          tagCountsDict[tag]++;
        } else {
          tagCountsDict[tag] = 1;
        }
      });
    });

    const tagCountsArray = Object.keys(tagCountsDict).map((tag) => {
      return { tag: tag, count: tagCountsDict[tag] };
    });

    setTagCounts(tagCountsArray);
    
  }, [posts]);

  const renderTagCount = ({ item }) => {
    const onPressTag = () => {
      setSelectedTag(item.tag);
    };

    return (
      <TouchableOpacity onPress={onPressTag} style={styles.tagItem}>
        <Text style={styles.tagText}>
          {item.tag} ({item.count})
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPostTitle = ({ item }) => {
    return (
      <View style={styles.postItem}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : [];

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={tagCounts}
            renderItem={renderTagCount}
            keyExtractor={(item) => item.tag}
            numColumns={3}
          />
          <Text style={styles.selectedTagText}>
            Selected Tag: {selectedTag ? selectedTag : "None"}
          </Text>
          <Text>Titles</Text>
          {selectedTag && (
            <FlatList
              data={filteredPosts}
              renderItem={renderPostTitle}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  tagItem: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  tagText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedTagText: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  postItem: {
    backgroundColor: "#e6e6e6",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});

export default TagCount;
