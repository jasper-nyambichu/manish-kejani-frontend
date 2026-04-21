  const { data: product, isLoading, isError } = useProduct(id!);
  const { data: relatedProducts = [] } = useRelatedProducts(id!, 6);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen,   setLightboxOpen]  = useState(false);
  const [quantity,       setQuantity]      = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);
