useEffect(() => {
  (async () => {
    try {
      if (!isFirebaseConfigured()) throw new Error("Firebase not configured");
      const { getAuth } = await loadFirebaseDeps();
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast({ variant: "destructive", title: "Login required", description: "Please login as a student." });
        navigate("/login");
        return;
      }

      // Check role
      const { getFirestore, doc, getDoc } = await loadFirebaseDeps();
      const db = getFirestore();
      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists() || snap.data().role !== "student") {
        toast({ variant: "destructive", title: "Access denied", description: "Only students can book sessions." });
        navigate("/dashboard");
        return;
      }

      // ✅ Load counselors (all roles of type counselor or onCampusCounselor)
      const { collection, query, where, onSnapshot } = await loadFirebaseDeps();
      const q = query(
        collection(db, "users"),
        where("role", "in", ["counselor", "onCampusCounselor"])
      );
      const unsub = onSnapshot(q, (snap: any) => {
        const list: Counselor[] = [];
        snap.forEach((doc: any) => list.push({ id: doc.id, ...(doc.data() as any) }));
        setCounselors(list);
      });
      return () => unsub();
    } catch (e: any) {
      toast({ variant: "destructive", title: "Failed to load counselors", description: e?.message || String(e) });
    }
  })();
}, [toast, navigate]);
