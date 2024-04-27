import { motion } from "framer-motion";

const History = () => {
    return ( 
        <motion.div className="history"
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}>
            History
        </motion.div>
     );
}
 
export default History;