def split_data(images, labels, train_size=0.9, shuffle=True):
    size = len(images)
    # matriz de índices
    indices = np.arange(size)
    if shuffle:
        np.random.shuffle(indices)

    train_samples = int(size * train_size)
    # dividimos la data
    x_train, y_train = images[indices[:train_samples]], labels[indices[:train_samples]]
    x_valid, y_valid = images[indices[train_samples:]], labels[indices[train_samples:]]
    return x_train, x_valid, y_train, y_valid

def encode_single_sample(img_path, label):
    # leemos la imágene y lo pasamos a un solo canal
    img = tf.io.read_file(img_path)
    img = tf.io.decode_png(img, channels=1)
    # reescalamos en [0,1] con tipo float32
    img = tf.image.convert_image_dtype(img, tf.float32)
    # redimensionamos
    img = tf.image.resize(img, [img_height, img_width])
    img = tf.transpose(img, perm=[1, 0, 2])
    # mapeamos las etiquetas
    label = char_to_num(tf.strings.unicode_split(label, input_encoding="UTF-8"))
    return {"image": img, "label": label}


# Decodificamos la salida de la red
def decode_batch_predictions(pred):
    input_len = np.ones(pred.shape[0]) * pred.shape[1]
    # Use greedy search. For complex tasks, you can use beam search
    results = keras.backend.ctc_decode(pred, input_length=input_len, greedy=True)[0][0][
        :, :max_length
    ]
    # Iterate over the results and get back the text
    output_text = []
    for res in results:
        res = tf.strings.reduce_join(num_to_char(res)).numpy().decode("utf-8")
        output_text.append(res)
    return output_text


def plot_demo(train_dataset):
  _, ax = plt.subplots(4, 4, figsize=(10, 5))
  for batch in train_dataset.take(1):
      images = batch["image"]
      labels = batch["label"]
      for i in range(16):
          img = (images[i] * 255).numpy().astype("uint8")
          label = tf.strings.reduce_join(num_to_char(labels[i])).numpy().decode("utf-8")
          ax[i // 4, i % 4].imshow(img[:, :, 0].T, cmap="gray")
          ax[i // 4, i % 4].set_title(label)
          ax[i // 4, i % 4].axis("off")
  return plt.show()