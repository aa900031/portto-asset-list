import { ref } from 'vue';
import { stringifyQuery } from 'vue-router';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

export interface AssetItem {
  imageUrl: string
  name: string
  desc: string
  tokenId: string
  address: string
}

export const useAssetList = (id: string, offset: number = 0) => {
  const isFetching = ref<boolean>(false)
  const isEnding = ref<boolean>(false)
  const currentData = ref<AssetItem[]>([])
  const currentOffset = ref<number>(offset)
  const fetchNext = async () => {
    if (isEnding.value) return
    if (isFetching.value) return

    isFetching.value = true

    const data = await _fetchData(id, 20, currentOffset.value).toPromise()
    const list = _tranDataToAssetList(data)

    currentOffset.value += list.length
    currentData.value.push(...list)
    isFetching.value = false
    isEnding.value = list.length === 0
  }

  return {
    isFetching,
    isEnding,
    currentData,
    currentOffset,
    fetchNext,
  }
}

const _fetchData = (
  id: string,
  limit: number = 20,
  offset: number = 0
) => {
  const qs = stringifyQuery({
    format: 'json',
    owner: id,
    offset,
    limit,
  })

  return fromFetch(`https://api.opensea.io/api/v1/assets?${qs}`).pipe(
    switchMap(res => res.ok && res.json())
  )
}

const _tranDataToAssetList = (data: any): AssetItem[] => {
  return data.assets.map((item) => {
    return {
      imageUrl: item.image_url,
      name: item.name,
      desc: item.description,
      tokenId: item.token_id,
      address: item.asset_contract.address,
    }
  });
}
