import { useBuilder } from '../context/BuilderContext';
import PublicPage from '../components/PublicPage';

export default function PublishedPage() {
  const { state } = useBuilder();
  return <PublicPage page={state.page} />;
}
