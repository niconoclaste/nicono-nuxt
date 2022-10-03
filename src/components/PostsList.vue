<template>
  <ul class="m-posts-list" v-if="postlist.length">
    <li v-for="post in postlist" :key="post.date">
      <a :href="post._path">
        <div class="m-posts-list_thumb" v-if="post.thumb">
          <img :src="post.thumb" :alt="post[langKey('title')]" class="img">
        </div>
        <div class="m-posts-list_body">
          <p class="m-posts-list_category">{{post[langKey('category')]}}</p>
          <h2 class="title">{{post[langKey('title')]}}</h2>
					<p class="m-posts-list_date">{{new Intl.DateTimeFormat('ja-JP', {dateStyle: dateSyle()}).format(new Date(post.date))}}</p>
          <p class="m-posts-list_desc">{{post[langKey('excerpt')]}}</p>
					<template v-if="post.series && language === 'en'">
         		<p class="m-post-list_series">This article is the {{nth(post.series_nb)}} part of the [{{post.series}}] series.</p>
					</template>
					<template v-else-if="post.series">
          <p class="m-post-list_series">この記事は[{{post.series}}]シリーズの{{post.series_nb}}番目の記事です。</p>
					</template>

          <p class="m-posts-list_readmore">{{translation.articles.readmore[language]}}</p>
          <div class="m-posts-list_tags" v-if="post.tags">
						<span v-for="tag in post.tags">{{tag}}</span>
					</div>
        </div>
      </a>
    </li>

  </ul>

<!-- no post -->
	<div class="m-bloc" v-else>
		<h2 class="title">{{translation.common.nopost[language]}}</h2>
	</div>
</template>


<script setup>
	import translation from '~/assets/translation.json';
	let order = 'DESC';
	const { data: posts } = await useAsyncData('posts-list', () => queryContent('/articles').find());

	const props = defineProps({
		language: '',
		top: false,
	});

	let postlist = posts._rawValue;
	if(props.top){
		postlist = postlist.filter((post) => post.top);
	}

  if(order === 'ASC'){
    // oldest -> newest
    postlist = postlist.sort((a, b) =>
    new Date(a.date).getTime() < new Date(b.date).getTime()
      ? -1
      : 0
  	)
	}else{
		// newest -> oldest
    postlist = postlist.sort((a, b) =>
    new Date(a.date).getTime() > new Date(b.date).getTime()
      ? -1
      : 0
  	)
	}

  function langKey(key){
    return props.language === 'en' ? key : key +'_'+ props.language;
  };
  function dateSyle(){
		return props.language === 'en' ? 'short' : 'long';
	};
  function nth(nb){
    return nb < 11 || nb > 13 ? nb + ['st', 'nd', 'rd', 'th'][Math.min((nb - 1) % 10, 3)] : nb + 'th';
  }
</script>